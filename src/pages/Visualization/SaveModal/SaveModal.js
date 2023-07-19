import {
  Button,
  ButtonStrip,
  InputField,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  SingleSelectField,
  SingleSelectOption,
} from "@dhis2/ui";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useDataMutation, useAlert } from "@dhis2/app-runtime";

const createMutation = (id) => ({
  type: "create",
  resource: "dataStore/visualization" + "/" + id,
  data: ({ data }) => data,
});
const updateMutation = {
  type: "update",
  resource: "dataStore/visualization",
  id: ({ id }) => id,
  data: ({ data }) => data,
};

export function SaveModal({
  onClose,
  hide,
  config,
  id,
  edit,
  defaultValue,
  setOnHide,
}) {
  const [create, { loading: creating }] = useDataMutation(createMutation(id));
  const [update, { loading: updating }] = useDataMutation(updateMutation);
  const { show } = useAlert(
    edit ? "Successfully Update" : "Successfully Save",
    { duration: 3000 }
  );

  const form = useForm({
    defaultValues: defaultValue,
  });

  const onSave = async ({ name, status }) => {
    const payload = {
      id,
      config: {
        data: config.data,
        cols: config.cols,
        rows: config.rows,
        aggregatorName: config.aggregatorName,
        rendererName: config.rendererName,
      },
      name,
      status,
      createdAt: new Date().toLocaleDateString(),
    };
    console.log(payload);
    try {
      if (edit) {
        await update({
          id,
          data: payload,
        });
      } else {
        await create({
          data: payload,
        });
      }

      onClose(); // Close the modal after saving or updating
      // window.alert("Save/update successful!");
      show();
      // Display an alert
    } catch (error) {
      console.error("Error saving/updating data:", error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalTitle>
        <ModalTitle>Save the Data</ModalTitle>
      </ModalTitle>
      <ModalContent>
        <FormProvider {...form}>
          <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Controller
              name="name"
              render={({ field, fieldState }) => {
                return (
                  <InputField
                    {...field}
                    onChange={({ value }) => field.onChange(value)}
                    label={"Name"}
                    placeholder="Enter file name"
                    autoComplete="off"
                  />
                );
              }}
            />
            <Controller
              name="status"
              render={({ field, fieldState }) => {
                return (
                  <SingleSelectField
                    selected={field.value}
                    {...field}
                    onChange={({ selected }) => field.onChange(selected)}
                    label="Status"
                    placeholder="Status"

                    //   onChange={onChange}
                  >
                    <SingleSelectOption label="Private" value="Private" />
                    <SingleSelectOption label="Public" value="Public" />
                  </SingleSelectField>
                );
              }}
            />
          </form>
        </FormProvider>
      </ModalContent>
      <ModalActions>
        <ButtonStrip end>
          <Button onClick={() => onClose()}> Close </Button>
          <Button
            loading={creating || updating}
            onClick={form.handleSubmit(onSave)}
            primary
          >
            {" "}
            {edit ? "Update" : "Save"}
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
}
export default SaveModal;
