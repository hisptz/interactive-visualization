import {
  Button,
  ButtonStrip,
  DropdownButton,
  Field,
  FlyoutMenu,
  InputField,
  MenuItem,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  SingleSelectField,
  SingleSelectOption,
} from "@dhis2/ui";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useDataMutation } from "@dhis2/app-runtime";


const mutation = {
    type: "create",
    resource: "dataStore/visualization/FYP",
    data: ({ data }) => data,
  };

export function SaveModal({ onClose, hide, config }) {
    const [saveConfig, { loading: savingConfig }] = useDataMutation(mutation);

  const form = useForm();

  const onSave = ({name, status}) => {

    const payload = {
        config,
        name,
        status,
        createdAt: new Date().toISOString()
    }

    console.log(payload);
  };

  return (
    <Modal onClose={onClose} hide={hide}>
      <ModalTitle>
        <ModalTitle>Save the File</ModalTitle>
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
                    placeholder="status"
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
          <Button onClick={form.handleSubmit(onSave)} primary>
            {" "}
            Submit
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
}
