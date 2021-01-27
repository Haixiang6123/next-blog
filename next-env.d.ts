/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.jpg" {
  const value: string;
  export default value;
}

type Post = {
  id: string;
  date: string;
  title: string;
}
