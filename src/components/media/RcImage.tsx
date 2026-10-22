import Rc_Image, { type ImageProps as Rc_ImageProps } from '@rc-component/image';
import { memo } from 'react';

type TRcImageProps = Rc_ImageProps & {};

// Mặc định lazy-load mọi ảnh; các ảnh trong màn hình đầu (hero) truyền loading="eager" tường minh.
const RcImage = ({ loading = 'lazy', ...props }: TRcImageProps) => {
  return <Rc_Image {...props} loading={loading} />;
};

export default memo(RcImage);
