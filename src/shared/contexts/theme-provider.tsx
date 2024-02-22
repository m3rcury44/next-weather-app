"use client"

import React, {ReactNode} from 'react';
import {ThemeProvider as NextThemeProvider} from "next-themes";

const ThemeProvider = ({children}: {children: ReactNode}) => {
    return (
        <NextThemeProvider attribute='class' enableSystem defaultTheme='system'>
            {children}
        </NextThemeProvider>
    );
};

export default ThemeProvider;