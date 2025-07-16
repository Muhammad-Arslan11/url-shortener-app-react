import { useUrlState } from "@/UrlContext";
import React, { useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { useState } from "react";
import * as Yup from "yup";
import { QRCode } from "react-qrcode-logo";
import { createUrl } from "../../db/apiUrl";
import useFetch from "@/hooks/useFetch";

function CreateLink() {


  const { user } = useUrlState();
  const navigate = useNavigate();
  const ref = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

   const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, user?.id);

    useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Must be a valid URL")
      .required("URL is required"),
    customElements: Yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

   const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, {abortEarly: false});

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };


  return (
    <>
 <div>
      <Dialog
        defaultOpen={longLink}
        onOpenChange={(res) => {
          if (!res) setSearchParams({});
        }}
      >
        <DialogTrigger asChild>
          <Button variant="destructive">Create Link</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          {formValues?.longUrl && <QRCode value={formValues?.longUrl} size={250} ref={ref} />}

          <Input
            id="title"
            placeholder="Short link title"
            value={formValues.title}
            onChange={handleChange}
            className="text-white w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-800"
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Enter your long link"
            value={formValues.longUrl}
            onChange={handleChange}
            className="text-white w-full mt-2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-800"
          />
          {errors.longUrl && <Error message={errors.longUrl} />}

          <div className="flex items-center gap-2 mt-2">
            <Card>trimrr.in</Card>
            <Input
              id="customUrl"
              placeholder="Enter your custom link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
              className="text-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-800"
            />
            {errors.message && <Error message={errors.message} />}
          </div>

          <DialogFooter className="sm:justify-start mt-4">
            <Button type="button" onClick={createNewLink}>
              {loading ? <BeatLoader size={10} color="white" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}

export default CreateLink;
