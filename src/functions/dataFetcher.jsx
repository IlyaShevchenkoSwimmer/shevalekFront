async function dataFetcher(url) {
  const album = { photos: [], dirs: [] };
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const directories = data._embedded.items;
      directories.map((directory) => {
        const path = directory.path;
        const name = directory.name;
        const sizes = directory.sizes;
        if (directory.type !== "dir" && directory.media_type === "image") {
          let dateExif = directory.exif.date_time;
          let year = "";
          let month = "";
          let day = "";
          let hour = "";
          let minute = "";
          let second = "";
          if (dateExif !== undefined) {
            year = dateExif.slice(0, 4);
            month = dateExif.slice(5, 7);
            day = dateExif.slice(8, 10);
            hour = dateExif.slice(11, 13);
            minute = dateExif.slice(14, 16);
            second = dateExif.slice(17, 19);
          }
          album.photos.push({
            path,
            name,
            preview: sizes[6]["url"],
            carousel: sizes[10]["url"],
            date: { year, month, day, hour, minute, second },
          });
        }
        if (directory.type === "dir") {
          album.dirs.push({ path, name });
        }
      });
    })
    .catch((error) => console.log(error));
  console.log(album);
  return album;
}

export default dataFetcher;
