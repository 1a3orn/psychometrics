import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

export abstract class BaseTable extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

@Entity()
export class User extends BaseTable {
  @Column({ unique: true, name: "email" })
  email: string;

  @Column({ name: "username" })
  username: string;

  @OneToMany(() => UserLoginStrategy, (strategy) => strategy.user)
  loginStrategies: UserLoginStrategy[];

  @OneToMany(() => Run, (run) => run.user)
  runs: Run[];

  @OneToMany(() => Measure, (measure) => measure.user)
  measures: Measure[];
}

@Entity()
export class Admin extends BaseTable {
  @Column({ unique: true, name: "email" })
  email: string;

  @Column({ name: "username" })
  username: string;

  @OneToMany(() => AdminLoginStrategy, (strategy) => strategy.admin)
  loginStrategies: AdminLoginStrategy[];

  // Has no runs or measures
}

/*
 * Login Strategies
 */
@Entity()
export class UserLoginStrategy extends BaseTable {
  @ManyToOne(() => User, (user) => user.loginStrategies)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "strategy_type" })
  strategyType: string;

  @Column("jsonb", { name: "strategy_data" })
  strategyData: Record<string, any>;
}

@Entity()
export class AdminLoginStrategy extends BaseTable {
  @ManyToOne(() => Admin, (admin) => admin.loginStrategies)
  @JoinColumn({ name: "admin_id" })
  admin: Admin;

  @Column({ name: "strategy_type" })
  strategyType: string;

  @Column("jsonb", { name: "strategy_data" })
  strategyData: Record<string, any>;
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
  @Column({ unique: true, name: "key" })
  key: string;

  @Column({ name: "name" })
  name: string;

  @Column("simple-array", { name: "measures" })
  measures: string[];

  @Column({ name: "task_version" })
  taskVersion: number;

  @OneToMany(() => Run, (run) => run.task)
  runs: Run[];
}

@Entity()
export class Run extends BaseTable {
  @Column({ name: "started_at" })
  startedAt: Date;

  @Column({ name: "ended_at" })
  endedAt: Date;

  @Column("jsonb", { name: "metadata", nullable: true })
  metadata: Record<string, any>;

  @ManyToOne(() => Task, (task) => task.runs)
  @JoinColumn({ name: "task_id" })
  task: Task;

  @ManyToOne(() => User, (user) => user.runs)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Measure, (measure) => measure.run)
  measures: Measure[];
}

@Entity()
export class Measure extends BaseTable {
  @Column({ name: "key" })
  key: string;

  @Column({ name: "number" })
  number: number;

  @ManyToOne(() => Run, (run) => run.measures)
  @JoinColumn({ name: "run_id" })
  run: Run;

  @ManyToOne(() => User, (user) => user.measures)
  @JoinColumn({ name: "user_id" })
  user: User;
}
