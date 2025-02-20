import { BranchChangeRecordParams, RecordType } from "API/branch/type";
import i18n from "lib/i18next";
import yup from "lib/yup";
export const branchRecordDefault: BranchChangeRecordParams = {
  branchId: "",
  recordType: RecordType.Pending,
  rejectingReason: "",
};

const branchRecordSchema = yup.object().shape({
  rejectingReason: yup.string().trim(),
  recordType: yup.number().test("not-pending", i18n.t("validation.recordType"), (value) => value !== RecordType.Pending),
});

export default branchRecordSchema;
