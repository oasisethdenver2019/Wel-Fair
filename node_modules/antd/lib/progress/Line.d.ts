import * as React from 'react';
import { ProgressProps } from './progress';
interface LineProps extends ProgressProps {
    prefixCls: string;
    children: React.ReactNode;
}
declare const Line: React.SFC<LineProps>;
export default Line;
