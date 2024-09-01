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
  Index,
} from "typeorm";

export abstract class BaseTable extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt: Date;
}

@Entity()
export class User extends BaseTable {
  @Column({ name: "username", nullable: false })
  @Index({ unique: true })
  username: string;

  @Column({ unique: true, name: "email", nullable: false })
  email: string;

  @OneToMany(() => UserLoginStrategy, (strategy) => strategy.user)
  loginStrategies: UserLoginStrategy[];

  @OneToMany(() => Run, (run) => run.user)
  runs: Run[];
}

@Entity()
export class Admin extends BaseTable {
  @Column({ name: "username", nullable: false })
  @Index({ unique: true })
  username: string;

  @Column({ unique: true, name: "email", nullable: false })
  email: string;

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
  @Index()
  user: User;

  @Column({ name: "strategy_type", nullable: false })
  strategyType: string;

  @Column("jsonb", { name: "strategy_data", nullable: false })
  strategyData: Record<string, any>;
}

@Entity()
export class AdminLoginStrategy extends BaseTable {
  @ManyToOne(() => Admin, (admin) => admin.loginStrategies)
  @JoinColumn({ name: "admin_id" })
  @Index()
  admin: Admin;

  @Column({ name: "strategy_type", nullable: false })
  strategyType: string;

  @Column("jsonb", { name: "strategy_data", nullable: false })
  strategyData: Record<string, any>;
}

/*
 * 'Task' - Run - Measure is the hierarchy
 *
 * Task has many Runs, but Task is also implicit and not a DB entity
 * Run has many Measures
 * Measure has no children
 *
 * Many runs per task and per user
 * A few measures per run
 */

@Entity()
export class Run extends BaseTable {
  @Index()
  @Column({ name: "key" })
  key: string;

  @Column({ name: "started_at", nullable: false })
  @Index()
  startedAt: Date;

  @Column({ name: "ended_at", nullable: false })
  @Index()
  endedAt: Date;

  @Column("jsonb", { name: "metadata", nullable: false })
  metadata: Record<string, any>;

  @ManyToOne(() => User, (user) => user.runs)
  @JoinColumn({ name: "user_id" })
  @Index()
  user: User;

  @OneToMany(() => Measure, (measure) => measure.run)
  measures: Measure[];
}

@Entity()
export class Measure extends BaseTable {
  @Column({ name: "key", nullable: false })
  key: string;

  @Column({ name: "number", type: "float", nullable: false })
  number: number;

  @ManyToOne(() => Run, (run) => run.measures)
  @JoinColumn({ name: "run_id" })
  @Index()
  run: Run;
}
