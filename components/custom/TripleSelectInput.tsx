'use client'

import {Button, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';
import {Input} from 'react-aria-components';
import './TripleSelectInput.css';
import {Search} from "lucide-react";
import {TSIForm} from "@/app/actions";


export default function TripleSelectInput() {
 return (
    <form className='TripleSelectInput' action={TSIForm}>
      <Select name='method' defaultSelectedKey='uid' className="tsi-Select" aria-label='选择查询方式'>
        <Button  className="tsi-Button" aria-label='展开列表'>
          <SelectValue defaultValue='uid' className='tsi-SelectValue'/>
          <span aria-hidden="true">▼</span>
        </Button>
        <Popover className="tsi-Popover">
          <ListBox className='tsi-ListBox' aria-label='listbox'>
            <ListBoxItem id='uid' className='tsi-ListBoxItem' aria-label='uid'>UID</ListBoxItem>
            <ListBoxItem id='id' className='tsi-ListBoxItem' aria-label='id'>ID</ListBoxItem>
            <ListBoxItem id='un' className='tsi-ListBoxItem' aria-label='username'>用户名</ListBoxItem>
          </ListBox>
        </Popover>
      </Select>
      <Input  className='tsi-Input' name='id' placeholder='输入点什么吧……'  />
      <Button className='tsi-Confirm' aria-label='搜索' type='submit'>
        <Search />
      </Button>
    </form>

  );
}
