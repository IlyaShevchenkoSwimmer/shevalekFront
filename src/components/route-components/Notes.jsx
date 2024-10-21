import Loading from "../small-components/Loading";

function Notes() {
  return (
    <div className="wrapper-empty-folder">
      <Loading text="Shevalek.Space" />
      <a
        href="https://litres.ru/69551509"
        target="_blank"
        className="empty-folder-a"
      >
        Почитать
      </a>
    </div>
  );
}

export default Notes;
