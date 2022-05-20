import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { TextArea } from './TextArea';
import toast from '../utils/alert';
import { storePost } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicPostsForUser } from '../containers/main/actions';

export const UploadImage = ({ isOpen, closeModal, account, contract }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [buttonTxt, setButtonTxt] = useState('Upload');
  const [name, setName] = useState('public');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const uploadImage = async () => {
    try {
      setButtonTxt('Uploading to IPFS...');

      const res = await storePost(file, name, title, description, account);

      setButtonTxt('Storing in smart contract...');

      const uId = +user.id;

      await contract.methods
        .addPost(uId, name, res.cid)
        .send({ from: account, gasLimit: 6021975 });

      toast({ type: 'success', message: `Post uploaded with CID: ${res.cid}` });

      setFile(null);
      setName('public');
      setTitle('');
      setDescription('');
      setButtonTxt('Upload');
      await dispatch(getPublicPostsForUser(contract));
    } catch (error) {
      console.error(error);
      toast({ type: 'error', message: 'Please try again' });
      setButtonTxt('Upload');
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[500] overflow-y-auto"
          onClose={closeModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />

          <div className="min-h-screen px-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl  max-w-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Upload Post
                </Dialog.Title>

                <div className="mt-4 flex justify-around">
                  {['Public', 'Gold', 'Diamond'].map((level) => (
                    <div key={level}>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name={level.toLowerCase()}
                          value={level.toLowerCase()}
                          checked={name === level.toLowerCase()}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <span className="ml-2 text-base">{level}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    className="my-3"
                    type="file"
                  />
                </div>

                {file && (
                  <div className="mt-2">
                    <img src={URL.createObjectURL(file)} alt="preview" />
                  </div>
                )}

                <div className="mt-4">
                  <TextArea
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    varient="ongray"
                    placeholder="Title"
                    rows={1}
                  />
                </div>

                <div className="mt-4">
                  <TextArea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    varient="ongray"
                    placeholder="Description"
                    rows={2}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    disabled={buttonTxt !== 'Upload'}
                    className="float-right btn bg-blue-800 text-white hover:bg-[#004c81e6]"
                    onClick={() => {
                      if (file) uploadImage();
                    }}
                  >
                    {buttonTxt}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
