import {Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';
import {TextField, Input} from 'react-aria-components';
import './TripleSelectInput.css';
import {useState} from "react";
import {Search} from "lucide-react";

export default function TripleSelectInput() {
  const [selectedKey, setSelectedKey] = useState<string>('ID');


  return (
    <div className='TripleSelectInput'>
      <Select defaultSelectedKey={selectedKey} onSelectionChange={(id)=>setSelectedKey(id as string)} className="tsi-Select">
        <Button  className="tsi-Button">
          <SelectValue defaultValue={selectedKey}  className='tsi-SelectValue'/>
          <span aria-hidden="true">▼</span>
        </Button>
        <Popover className="tsi-Popover">
          <ListBox className='tsi-ListBox'>
            <ListBoxItem id='UID' className='tsi-ListBoxItem'>UID</ListBoxItem>
            <ListBoxItem id='ID' className='tsi-ListBoxItem'>ID</ListBoxItem>
            <ListBoxItem id='用户名' className='tsi-ListBoxItem'>用户名</ListBoxItem>
          </ListBox>
        </Popover>
      </Select>
      <Input  className='tsi-Input'/>
      <Button className='tsi-Confirm'>
        <Search />
      </Button>
    </div>

  );
}
