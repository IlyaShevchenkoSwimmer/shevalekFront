import Loading from "../small-components/Loading";

function Contacts() {
  return (
    <div className="wrapper-empty-folder">
      <Loading text="Shevalek.Space" />
      <a
        href="https://t.me/ShevalekSpace"
        target="_blank"
        className="empty-folder-a"
      >
        Поговорить
      </a>
    </div>
  );
}

export default Contacts;
