import multer from 'multer';

const upload = multer({
    dest: './uploads/', // where the files will be stored
});  //multer middleware

export default upload;