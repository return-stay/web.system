import { Message } from 'element-ui';
export const beforeAvatarUpload = (file, max = 2, callback) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < max;

  if (!isJPG) {
    Message.error('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    Message.error('上传头像图片大小不能超过 2MB!');
  }
  callback && callback(file)
  return isJPG && isLt2M;
}