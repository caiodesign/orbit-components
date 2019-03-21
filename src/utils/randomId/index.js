// @flow
import type { Random } from "./index.flow";

const randomId: Random = (name: string) => {
  return name + Math.floor(Math.random() * 1000000000) + Math.floor(Math.random() * 1000000000);
};

export default randomId;
