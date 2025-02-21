import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({
  showSpinner: false,
});
export const start = () => nprogress.start();
export const done = () => nprogress.done();
