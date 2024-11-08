const ShowFormikState = ({
  message,
  props,
}: {
  message: string;
  props: any;
}) => (
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }} />
    <pre
      style={{
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>DEBUG</strong>
      <br />
      <br />
      <strong>{message}</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

export default ShowFormikState;
