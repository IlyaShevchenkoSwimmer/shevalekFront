import Loading from "../small-components/Loading";

function Video() {
  return (
    <div className="wrapper-empty-folder">
      <Loading text="Shevalek.Space" />
      <a
        href="https://vk.com/video/@club224999539"
        target="_blank"
        className="empty-folder-a"
      >
        Посмотреть
      </a>
    </div>
  );
}

export default Video;
