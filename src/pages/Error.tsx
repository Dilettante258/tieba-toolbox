import { LinkBreak } from "@phosphor-icons/react";
import { useRouteError, ErrorResponse } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as ErrorResponse;
  console.error(error);

  return (
    <main>
      <div id="error-page">
        <LinkBreak size={80} />
        <h1>Oops!</h1>
        <p>很抱歉，发生了意外错误。</p>
        <p>{error.status} {error.statusText}</p>
        <i>{error.data}</i>
      </div>
    </main>

  );
}