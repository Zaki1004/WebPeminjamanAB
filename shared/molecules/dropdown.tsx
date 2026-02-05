import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Labels from "../atoms/labels";

interface FormSelectProps<T extends string> {
  htmlFor: string;
  children: React.ReactNode;
  value: T;
  options: Record<T, { label: string }>;
  placeholder?: string;
  onChange: (value: T) => void;
}

const Dropdown = <T extends string>({
  htmlFor,
  children,
  value,
  options,
  placeholder = "Pilih opsi",
  onChange,
}: FormSelectProps<T>) => {
  const entries = Object.entries(options) as [T, { label: string }][];

  return (
    <div className="flex flex-col gap-2">
      <Labels htmlFor={htmlFor}>{children}</Labels>

      <Select value={value} onValueChange={(v) => onChange(v as T)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {entries.map(([key, opt]) => (
              <SelectItem key={key} value={key}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
