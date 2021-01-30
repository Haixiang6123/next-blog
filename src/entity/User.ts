import {BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import _ from 'lodash';
import {Post} from './Post'
import {Comment} from './Comment'
import getDBConnection from '../../lib/getDBConnection'
import md5 from 'md5'

type UserError = {
  username: string[];
  password: string[];
  passwordConfirmation: string[];
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  passwordDigest: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Post, post => post.author)
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[]

  password: string;
  passwordConfirmation: string;

  errors: UserError = {
    username: [],
    password: [],
    passwordConfirmation: [],
  };

  @BeforeInsert()
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password);
  }

  async validate() {
    // const connection = await getDBConnection();
    //
    // const found = await connection.manager.find(User, {username: this.username});
    //
    // if (found) {
    //   this.errors.username.push('已存在，不能重复注册');
    // }

    if (this.username.trim() === '') {
      this.errors.username.push('不能为空');
    }
    if (!/[a-zA-Z0-9]*/.test(this.username.trim())) {
      this.errors.username.push('格式不合法');
    }
    if (this.username.trim().length > 42) {
      this.errors.username.push('太长');
    }
    if (this.username.trim().length < 3) {
      this.errors.username.push('太短');
    }

    if (this.password.trim() === '') {
      this.errors.password.push('不能为空');
    }
    if (this.password !== this.passwordConfirmation) {
      this.errors.passwordConfirmation.push('密码不匹配')
    }
  }

  hasErr() {
    return Object.values(this.errors).some(errList => errList.length > 0);
  }

  toJSON() {
    return _.omit(this, ['password', 'passwordConfirmation', 'passwordDigest', 'errors']);
  }
}
