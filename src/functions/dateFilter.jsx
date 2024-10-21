function dateFilter(photos) {
  if (photos[0].date.year !== "") {
    const filteredPhotos = photos.sort((first, second) => {
      if (first.date.year < second.date.year) {
        return 1;
      }
      if (first.date.year > second.date.year) {
        return -1;
      }
      if (first.date.month < second.date.month) {
        return 1;
      }
      if (first.date.month > second.date.month) {
        return -1;
      }
      if (first.date.day < second.date.day) {
        return 1;
      }
      if (first.date.day > second.date.day) {
        return -1;
      }
      if (first.date.hour < second.date.hour) {
        return 1;
      }
      if (first.date.hour > second.date.hour) {
        return -1;
      }
      if (first.date.minute < second.date.minute) {
        return 1;
      }
      if (first.date.minute > second.date.minute) {
        return -1;
      }
      if (first.date.second < second.date.second) {
        return 1;
      }
      if (first.date.second > second.date.second) {
        return -1;
      }
    });
    return filteredPhotos;
  }
  return photos;
}

export default dateFilter;
