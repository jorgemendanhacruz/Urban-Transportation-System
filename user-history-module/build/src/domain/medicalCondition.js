"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalCondition = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Guard_1 = require("../core/logic/Guard");
const Result_1 = require("../core/logic/Result");
const medicalConditionId_1 = require("./medicalConditionId");
class MedicalCondition extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get medicalConditionId() {
        return medicalConditionId_1.MedicalConditionId.caller(this.id);
    }
    get medicalConditionCode() {
        return this.props.medicalConditionCode;
    }
    set designation(value) {
        this.props.designation = value;
    }
    get description() {
        return this.props.description;
    }
    get symptoms() {
        return this.props.symptoms;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.medicalConditionCode, argumentName: 'medicalConditionCode' },
            { argument: props.designation, argumentName: 'designation' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.symptoms, argumentName: 'symptoms' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const medicalCondition = new MedicalCondition(Object.assign({}, props), id);
            return Result_1.Result.ok(medicalCondition);
        }
    }
}
exports.MedicalCondition = MedicalCondition;
//# sourceMappingURL=medicalCondition.js.map