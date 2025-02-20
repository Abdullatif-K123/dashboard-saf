import { RecordType } from "API/branch/type";
import { CustomerUpdateRecordTypeBody } from "API/customer/type";
import i18n from "lib/i18next";
import yup from "lib/yup";
export const customerRecordDefault: CustomerUpdateRecordTypeBody = {
  userId: "",
  recordType: RecordType.Pending,
  cause: "",
};

const customerRecordSchema = yup.object().shape({
  cause: yup.string().trim(),
  userId: yup.string().required(),
  recordType: yup
    .number()
    .test("not-pending", i18n.t("validation.recordType"), (value) => value !== RecordType.Pending),
});

export default customerRecordSchema;
