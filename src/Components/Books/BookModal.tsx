import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseOutlined, InboxOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../Store/Hooks';
import { Upload, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { type BookModalProps, type BookType } from '../../Types/Books';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useFormik } from 'formik';
import { bookValidationSchema } from '../../Utils/Validation/Book';
import { backdropVariants, modal3DVariants } from '../../Constants/Animation';
import { INITIAL_BOOK_VALUES, BOOK_CATEGORIES, COVER_COLORS } from '../../Constants/BookConstants';
import ISO6391 from 'iso-639-1';
import { useBookStore } from '../../Store/useBookStore';
import { CommonButton, CommonInput, CommonSelect } from '../../Attributes';
import RichTextEditor from './RichTextEditor';

const languageCodes = ISO6391.getAllCodes();
const languageOptions = languageCodes.map((code) => ({
  value: code,
  label: `${ISO6391.getName(code)} (${ISO6391.getNativeName(code)})`,
  englishName: ISO6391.getName(code).toLowerCase(),
  nativeName: ISO6391.getNativeName(code).toLowerCase(),
  code: code.toLowerCase(),
}));

const BookModal: React.FC<BookModalProps> = ({ open, mode, book, onClose }) => {
  const themeMode = useAppSelector((s) => s.layout.theme);
  const isDark = themeMode === 'dark';

  const { addBook, updateBook } = useBookStore();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return false;
  };

  const formik = useFormik<BookType>({
    initialValues: INITIAL_BOOK_VALUES,
    enableReinitialize: true,
    validationSchema: bookValidationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const payload: BookType = {
          ...values,
          id: values.id || Math.random().toString(36).substring(2, 9),
          image: preview || values.image,
        };
        
        if (mode === 'add') {
          addBook(payload);
        } else {
          updateBook(payload);
        }
        onClose();
      } catch (err) {
        setStatus({ submit: `Failed to ${mode} book`, err });
      } finally {
        setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    let resetTimer: number | undefined;
    
    if (open) {
      document.body.style.overflow = 'hidden';
      if (mode === 'edit' && book) {
        formik.resetForm({ values: { ...book } });
        setPreview(book.image || null);
        setImageFile(null);
      } else {
        formik.resetForm({
          values: {
            ...INITIAL_BOOK_VALUES,
            id: Math.random().toString(36).substring(2, 9),
            coverColor: COVER_COLORS[Math.floor(Math.random() * COVER_COLORS.length)],
          }
        });
        resetTimer = window.setTimeout(() => {
          setImageFile(null);
          setPreview((prev) => {
            if (prev && prev.startsWith('blob:')) { URL.revokeObjectURL(prev); }
            return null;
          });
        }, 0);
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      if (resetTimer !== undefined) { window.clearTimeout(resetTimer); }
      document.body.style.overflow = '';
    };
  }, [open, mode, book]);

  const adjustPrice = (delta: number) => {
    formik.setFieldValue('price', Math.max(0, Number((formik.values.price + delta).toFixed(2))));
  };

  const adjustStock = (delta: number) => {
    formik.setFieldValue('stock', Math.max(0, Math.floor(formik.values.stock + delta)));
  };

  const isAddMode = mode === 'add';

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="ebm-backdrop-wrapper" initial="hidden" animate="visible" exit="hidden" variants={backdropVariants} style={{ backdropFilter: 'blur(6px)' }} onClick={onClose}>
          <motion.div className={`ebm-modal-container ${isDark ? 'ebm-modal-container-dark' : 'ebm-modal-container-light'}`} variants={modal3DVariants} onClick={(ev) => ev.stopPropagation()}>

          {/* add or edit logic & close button */}
            <div className="ebm-modal-header">
              <h3 className="ebm-modal-title">{isAddMode ? 'Add New Book' : 'Edit Book'}</h3>
              <CommonButton className="ebm-close-btn" onClick={onClose} aria-label="Close" icon={<CloseOutlined />} />
            </div>

            <form onSubmit={formik.handleSubmit} className="ebm-form">
              <div className="ebm-image-column">
                
                {/* image uploader */}
                <Upload.Dragger accept="image/*" multiple={false} showUploadList={false} beforeUpload={handleImageUpload} className="ebm-image-dragger" style={{ height: '240px' }}>
                  {preview ? (
                    <div className="ebm-dragger-preview"> <img src={preview} alt="preview" className="ebm-dragger-img" /> </div>
                  ) : (
                    <div className="ebm-dragger-empty">
                      <p className="ebm-dragger-icon"> <InboxOutlined /> </p>
                      <p className="ebm-dragger-text">Drag or click to upload</p>
                      <p className="ebm-dragger-hint">PNG, JPG, or SVG</p>
                    </div>
                  )}
                </Upload.Dragger>
                {imageFile && ( <p className="ebm-image-filename"> {imageFile.name} </p> )}
              </div>

                  {/* title & author */}
              <div className="ebm-form-column">
                <CommonInput label="Title" name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.title} touched={formik.touched.title} placeholder="e.g. The Great Gatsby" />
                <CommonInput label="Author" name="author" value={formik.values.author} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.author} touched={formik.touched.author} placeholder="e.g. F. Scott Fitzgerald" />

                  {/* price */}
                <div className="ebm-price-stock-row">
                  <div className="ebm-price-wrapper">
                    <label className="ebm-label">Price</label>
                    <div className="ebm-input-with-controls relative">
                      <span className="ebm-input-prefix absolute z-10 left-3 top-[10px] text-placeholder">$</span>
                      <CommonInput type="number" step="0.01" min={0} max={10000} name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} className="ebm-input-with-prefix ebm-input-number" wrapperClassName="" />

                      <div className="ebm-controls-container absolute right-2 top-[3px]">
                        <CommonButton type="button" onClick={() => adjustPrice(1)} className="ebm-control-btn" aria-label="Increase price" icon={<MdKeyboardArrowUp size={17} />} />
                        <CommonButton type="button" onClick={() => adjustPrice(-1)} className="ebm-control-btn" aria-label="Decrease price" icon={<MdKeyboardArrowDown size={17} />} />
                      </div>
                    </div>
                    {formik.touched.price && formik.errors.price && <div className="ebm-error">{formik.errors.price}</div>}
                  </div>

                  {/* Stock */}
                  <div className="ebm-stock-wrapper">
                    <label className="ebm-label">Stock</label>
                    <div className="ebm-input-with-controls relative">
                      <CommonInput type="number" step={1} min={0} max={10000} name="stock" value={formik.values.stock} onChange={formik.handleChange} onBlur={formik.handleBlur} className="ebm-input-with-suffix ebm-input-number" wrapperClassName="" />

                      <div className="ebm-controls-container absolute right-2 top-[3px]">
                        <CommonButton type="button" onClick={() => adjustStock(1)} className="ebm-control-btn ebm-control-btn-small" aria-label="Increase stock" icon={<MdKeyboardArrowUp size={16} />} />
                        <CommonButton type="button" onClick={() => adjustStock(-1)} className="ebm-control-btn ebm-control-btn-small" aria-label="Decrease stock" icon={<MdKeyboardArrowDown size={16} />} />
                      </div>
                    </div>
                    {formik.touched.stock && formik.errors.stock && <div className="ebm-error">{formik.errors.stock}</div>}
                  </div>
                </div>

                  {/* Category */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="ebm-field">
                    <label className="ebm-label">Category</label>
                    <CommonSelect
                      placeholder="Select category"
                      value={formik.values.category || undefined}
                      onChange={(val) => formik.setFieldValue('category', val)}
                      status={formik.touched.category && formik.errors.category ? 'error' : ''}
                      options={BOOK_CATEGORIES.map(c => ({ value: c, label: c }))} />

                    {formik.touched.category && formik.errors.category && <div className="ebm-error">{formik.errors.category}</div>}
                  </div>

                  <CommonInput label="ISBN" name="isbn" value={formik.values.isbn || ''} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="e.g. 978-3-16-148410-0" />
                </div>

                  {/* language */}
                <div className="ebm-field">
                  <label className="ebm-label">Languages</label>
                  <CommonSelect
                    mode="multiple"
                    placeholder="Select languages"
                    value={formik.values.languages || []}
                    onChange={(vals) => formik.setFieldValue('languages', vals)}
                    className="form-language-select"
                    status={formik.touched.languages && formik.errors.languages ? 'error' : ''}
                    options={languageOptions} />

                  {formik.touched.languages && formik.errors.languages && <div className="ebm-error">{formik.errors.languages}</div>}
                </div>

                  {/* Publisher & date */}
                <div className="grid grid-cols-2 gap-3">
                  <CommonInput label="Publisher" name="publisher" value={formik.values.publisher || ''} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Publisher" />
                  <div className="ebm-field">
                    <label className="ebm-label">Pub. Date</label>
                    <DatePicker
                      placeholder="Select date"
                      className="ebm-datepicker"
                      format="YYYY-MM-DD"
                      value={formik.values.publishedDate && dayjs(formik.values.publishedDate).isValid() ? dayjs(formik.values.publishedDate) : null}
                      onChange={(_, dateString) => {
                        const val = dateString ? (Array.isArray(dateString) ? dateString[0] : dateString) : ''; formik.setFieldValue('publishedDate', val); }}
                      onBlur={formik.handleBlur} />
                  </div>
                </div>

                  {/*  Description */}
                <div className="ebm-field">
                  <label className="ebm-label">Description</label>
                  <RichTextEditor value={formik.values.description || ''} onChange={(val) => formik.setFieldValue('description', val)} placeholder="Add book details and summary..." />
                </div>
                {formik.status?.submit && <div className="ebm-error text-center">{formik.status.submit}</div>}

                  {/* cancle & submit button */}
                <div className="ebm-actions">
                  <CommonButton type="button" onClick={onClose} className="ebm-cancel-btn" text="Cancel" />
                  <CommonButton type="submit" disabled={formik.isSubmitting} className="ebm-submit-btn" text={isAddMode ? (formik.isSubmitting ? 'Adding...' : 'Add Book') : (formik.isSubmitting ? 'Updating...' : 'Update Book')} />
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookModal;
