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
  content: string;
}

// declare module 'next' {
//   import {Session} from 'next-iron-session'
//
//   interface NextApiRequest {
//     session: Session;
//   }
// }
