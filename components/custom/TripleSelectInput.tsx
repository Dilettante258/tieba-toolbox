'use client';

import {Button, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';
import {Input} from 'react-aria-components';
import styles from './TripleSelectInput.module.css';
import {Search} from "lucide-react";


export default function TripleSelectInput({action}:{action(formData: FormData):(void | Promise<void>)}) {
 return (
    <form className={styles.TripleSelectInput} action={action}>
      <Select name='method' defaultSelectedKey='uid' className={styles.tsiSelect} aria-label='选择查询方式'>
        <Button  className={styles.tsiButton} aria-label='展开列表'>
          <SelectValue defaultValue='uid' className={styles.tsiSelectValue}/>
          <span aria-hidden="true">▼</span>
        </Button>
        <Popover className={styles.tsiPopover}>
          <ListBox className={styles.tsiListBox} aria-label='listbox'>
            <ListBoxItem id='uid' className={styles.tsiListBoxItem} aria-label='uid'>UID</ListBoxItem>
            <ListBoxItem id='id' className={styles.tsiListBoxItem} aria-label='id'>ID</ListBoxItem>
            <ListBoxItem id='un' className={styles.tsiListBoxItem} aria-label='username'>用户名</ListBoxItem>
          </ListBox>
        </Popover>
      </Select>
      <Input  className={styles.tsiInput} name='id' placeholder='输入点什么吧……'  />
      <Button className={styles.tsiConfirm} aria-label='搜索' type='submit'>
        <Search />
      </Button>
    </form>
  );
}
