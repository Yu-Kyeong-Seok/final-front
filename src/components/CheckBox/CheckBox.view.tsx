import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CheckBox from "./CheckBox";

type CheckBoxFormType = {
  terms: string[];
};

const CheckBoxView = () => {
  const form = useForm<CheckBoxFormType>({
    defaultValues: {
      terms: [],
    },
  });

  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 추가

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    const currentValue = form.getValues("terms");

    const newValue = currentValue.includes(id)
      ? currentValue.filter((value) => value !== id)
      : [...currentValue, id];

    form.setValue("terms", newValue);
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      // 전체 선택
      form.setValue("terms", ["privacy", "using", "marketing", "age"]);
    } else {
      // 전체 해제
      form.setValue("terms", []);
    }
  };

  useEffect(() => {
    const currentTerms = form.getValues("terms");
    const allTerms = ["privacy", "using", "marketing", "age"];

    const allChecked = allTerms.every((term) => currentTerms.includes(term));
    setSelectAll(allChecked);
  }, [form]);

  return (
    <div>

      
      <fieldset>
        <CheckBox
          id="selectAll"
          label="전체 선택"
          name="selectAll"
          value={selectAll ? ["selectAll"] : []}
          onChange={handleSelectAllChange}
        />

        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => (
            <CheckBox
              id="privacy"
              label="개인정보 처리방침 (필수)"
              name={field.name}
              value={field.value}
              onChange={handleTermsChange}
            />
          )}
        />
        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => (
            <CheckBox
              id="using"
              label="서비스 이용약관 (필수)"
              name={field.name}
              value={field.value}
              onChange={handleTermsChange}
            />
          )}
        />
        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => (
            <CheckBox
              id="marketing"
              label="마케팅 정보 수신 동의 (선택)"
              name={field.name}
              value={field.value}
              onChange={handleTermsChange}
            />
          )}
        />
        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => (
            <CheckBox
              id="age"
              label="본인은 만 14세 이상입니다. (필수)"
              name={field.name}
              value={field.value}
              onChange={handleTermsChange}
            />
          )}
        />
      </fieldset>
      {/* <button onClick={() => console.log(form.getValues("terms"))}>버튼</button> */}
    </div>
  );
};

export default CheckBoxView;
