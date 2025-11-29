import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { MedicalConditionId } from "./medicalConditionId";


interface MedicalConditionProps {
  medicalConditionCode: string;
  designation: string;
  description?: string;
  symptoms?: string;
}

export class MedicalCondition extends AggregateRoot<MedicalConditionProps> {
  get id(): UniqueEntityID {
    return this._id;
  }
  get medicalConditionId(): MedicalConditionId {
    return MedicalConditionId.caller(this.id);
  }

  get medicalConditionCode(): string {
    return this.props.medicalConditionCode;
  }
  set designation(value: string) {
    this.props.designation = value;
  }
  get description(): string {
    return this.props.description;
  }
  get symptoms(): string {
    return this.props.symptoms;
  }


  private constructor(props: MedicalConditionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: MedicalConditionProps, id?: UniqueEntityID): Result<MedicalCondition> {

    const guardedProps = [
      { argument: props.medicalConditionCode, argumentName: 'medicalConditionCode' },
      { argument: props.designation, argumentName: 'designation' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.symptoms, argumentName: 'symptoms' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<MedicalCondition>(guardResult.message)
    }
    else {
      const medicalCondition = new MedicalCondition({
        ...props
      }, id);

      return Result.ok<MedicalCondition>(medicalCondition);
    }
  }
}
