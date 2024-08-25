import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";

export abstract class BaseTable extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class User extends BaseTable {
  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @OneToMany(() => UserLoginStrategy, strategy => strategy.user)
  loginStrategies: UserLoginStrategy[];

  @OneToMany(() => Run, run => run.user)
  runs: Run[];

  @OneToMany(() => Measure, measure => measure.user)
  measures: Measure[];
}

@Entity()
export class Admin extends BaseTable {
  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @OneToMany(() => AdminLoginStrategy, strategy => strategy.admin)
  loginStrategies: AdminLoginStrategy[];

  // Has no runs or measures
}

/*
 * Login Strategies
 */
@Entity()
export class UserLoginStrategy extends BaseTable {
  @ManyToOne(() => User, user => user.loginStrategies)
  user: User;

  @Column()
  strategy_type: string;

  @Column("jsonb")
  strategy_data: Record<string, any>;
}



@Entity()
export class AdminLoginStrategy extends BaseTable {
  @ManyToOne(() => Admin, admin => admin.loginStrategies)
  admin: Admin;

  @Column()
  strategy_type: string;

  @Column("jsonb")
  strategy_data: Record<string, any>;
}

/*
 * Tasks - Run - Measure is the hierarchy
 *
 * Task has many Runs
 * Run has many Measures
 * Measure has no children
 * 
 * Only one task-key for whole system
 * Many runs per task and per user
 * A few measures per run
 */
@Entity()
export class Task extends BaseTable {

  @Column({ unique: true })
  key: string;

  @Column()
  name: string;

  @Column("simple-array")
  measures: string[];

  @Column("float")
  task_version: number;

  @OneToMany(() => Run, run => run.task)
  runs: Run[];
}

@Entity()
export class Run extends BaseTable {
  @Column()
  started_at: Date;

  @Column()
  ended_at: Date;

  @Column("jsonb", { nullable: true })
  metadata: Record<string, any>;

  @ManyToOne(() => Task, task => task.runs)
  task: Task;

  @ManyToOne(() => User, user => user.runs)
  user: User;

  @OneToMany(() => Measure, measure => measure.run)
  measures: Measure[];
}

@Entity()
export class Measure extends BaseTable {
  @Column()
  key: string;

  @Column("float")
  number: number;

  @ManyToOne(() => Run, run => run.measures)
  run: Run;

  @ManyToOne(() => User, user => user.measures)
  user: User;
}