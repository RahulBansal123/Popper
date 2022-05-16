import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { TextArea } from './TextArea';
import toast from '../utils/alert';
import { decodeMultihash } from '../utils';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const UploadImage: React.FC<Props> = ({ isOpen, closeModal }) => {
  // const { account, storePost, addPost } = useData();

  const [buttonTxt, setButtonTxt] = useState<string>('Upload');
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const uploadImage = async () => {
    try {
      setButtonTxt('Uploading to IPFS...');
      // const res = await storePost(file, title, description, account);
      // console.log(res);

      setButtonTxt('Storing in smart contract...');
      // await contract.methods.createPost(res.postId).send({ from: account });
      // const multihash = decodeMultihash(res.cid);
      // await addPost(1, multihash.digest, multihash.hashFn, multihash.size);

      // toast({ type: 'success', message: `Post uploaded with CID: ${res.cid}` });
      setFile(null);
      setDescription('');
      setButtonTxt('Upload');
    } catch (error) {
      console.error(error);
      toast({ type: 'error', message: 'Please try again' });
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
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
                  Upload Image to IPFS
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    className="my-3"
                    type="file"
                  />
                </div>

                {file && (
                  <div className="mt-2">
                    <img src={URL.createObjectURL(file)} />
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
