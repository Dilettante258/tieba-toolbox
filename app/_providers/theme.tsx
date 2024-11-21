import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import {createLocalizedStringDictionary, LocalizedStringProvider} from "react-aria-components/i18n";
import type * as React from "react";

const dictionary = createLocalizedStringDictionary(['@react-aria/datepicker', "@react-aria/calendar","@react-aria/searchfield", "@react-aria/table", "@react-aria/tag", "@react-aria/combobox"]);

export default function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme='dark' attribute="class">
      <LocalizedStringProvider locale='zh-CN' dictionary={dictionary}/>
      {children}
    </ThemeProvider>
  );
}
