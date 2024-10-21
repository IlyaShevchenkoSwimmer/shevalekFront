import Loading from "../small-components/Loading";

function Music() {
  return (
    <div className="wrapper-empty-folder">
      <Loading text="Shevalek.Space" />
      <a
        href="https://music.yandex.ru/artist/22786250"
        target="_blank"
        className="empty-folder-a"
      >
        Послушать
      </a>
    </div>
  );
}

export default Music;
