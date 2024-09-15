import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type FormProps = {
  onSubmit: (note: {
    id: string;
    description: string;
    dateAdded: string;
    deadlineDate: string;
  }) => void;
  toggleForm: () => void;
  initialData?: {
    id: string;
    description: string;
    dateAdded: string;
    deadlineDate: string;
  } | null;
};

const Form = ({ onSubmit, toggleForm, initialData }: FormProps) => {
  const [description, setDescription] = useState<string>("");
  const [dateAdded, setDateAdded] = useState<DateObject>(
    new DateObject({ calendar: persian })
  );
  const [deadlineDate, setDeadlineDate] = useState<DateObject | null>(null);

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description);
      setDateAdded(new DateObject(initialData.dateAdded));
      setDeadlineDate(
        initialData.deadlineDate
          ? new DateObject(initialData.deadlineDate)
          : null
      );
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const noteData = {
      id: initialData ? initialData.id : `${Date.now()}`,
      description,
      dateAdded: dateAdded.format("YYYY/MM/DD"),
      deadlineDate: deadlineDate?.format("YYYY/MM/DD") || "",
    };
    onSubmit(noteData);
    toggleForm();
  };

  return (
    <div className="form-container">
      <p className="form-header">
        {initialData ? "ویرایش یادداشت" : "یادداشت جدید"}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description" className="description-label">
            توضیحات
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="description-input"
          />
        </div>

        <div className="form-group">
          <p className="createdAt-text">ایجاد شده در</p>
          <DatePicker
            value={dateAdded}
            calendar={persian}
            locale={persian_fa}
            readOnly
            format="YYYY/MM/DD"
            editable={false}
          />
        </div>

        <div className="form-group">
          <p className="deadline-label">مهلت تا</p>
          <DatePicker
            value={deadlineDate}
            onChange={setDeadlineDate}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
          />
        </div>

        <button type="submit" className="form-btn">
          {initialData ? "اعمال تغییرات" : "اضافه کردن یادداشت"}
        </button>
      </form>
    </div>
  );
};

export default Form;
