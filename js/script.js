//включение строгого режима
// "use strict";

import { datalistControle } from "./datalistControle.js";
import { financeControl } from "./financeControl.js";
import { reportControl } from "./reportControl.js";

const init = () => {
  financeControl();
  reportControl();
  datalistControle();
};

init();
