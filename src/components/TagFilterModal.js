import React, { useState, useEffect, use } from "react";
import { useAuth } from "@clerk/nextjs";
import Tag from "@/components/Tag";

import { randomColor } from "@/modules/util";
import { getAllTags, editTagForAll, deleteTagForAll } from "@/modules/data";

export default function TagFilterModal({
  showModal,
  onClose,
  handleTagClick,
  setIsLoading,
}) {
  const [tags, setTags] = useState([]);
  const { isLoaded, userId, getToken } = useAuth();
  useEffect(() => {
    async function process() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        return getAllTags(userId, token);
      }
      return [];
    }
    process().then((result) => {
      if (result === "403") router.push("/403");
      else {
        setTags(result);
        console.log(tags);
      }
    });
  }, [isLoaded, showModal]);

  const handleTagEdit = async (id, originalTag, updatedTag) => {
    setIsLoading(true);
    editTagForAll(
      userId,
      id,
      originalTag,
      updatedTag,
      await getToken({ template: "codehooks" })
    )
      .then((res) => {
        return res.json();
      })
      .then(async (data) =>
        setTags(
          await getAllTags(userId, await getToken({ template: "codehooks" }))
        )
      );
    setIsLoading(false);
  };
  const handleTagDelete = async (id, originalTag) => {
    setIsLoading(true);
    deleteTagForAll(
      userId,
      id,
      originalTag,
      await getToken({ template: "codehooks" })
    )
      .then((res) => {
        return res.json();
      })
      .then(async (data) =>
        setTags(
          await getAllTags(userId, await getToken({ template: "codehooks" }))
        )
      );
    setIsLoading(false);
  };
  return (
    <>
      {showModal && (
        <>
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Filter By Tags</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="d-flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag
                        key={tag._id}
                        color={randomColor()}
                        tag={tag.tag}
                        onTagEdit={(updatedTag) =>
                          handleTagEdit(tag._id, tag.tag, updatedTag)
                        }
                        onTagDelete={() => handleTagDelete(tag._id, tag.tag)}
                        active={false}
                        editable={
                          tag.tag !== "High Priority" &&
                          tag.tag !== "Low Priority"
                        }
                        onTagClick={(tag) => {
                          handleTagClick(tag);
                          onClose();
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          />
        </>
      )}
    </>
  );
}
