import React from "react";
import {DraggableAnnotation} from "./draggableAnnotations/draggableAnnotations"; // Adjust the import path as needed
import { AnnotationTypeEnum, User } from "@/utils/types"; // Adjust the import path as needed
import dynamic from "next/dynamic";
import "./sidePanel.css";
import SignerItem from './SignerItem/SignerItem';

const Select = dynamic(
  () => import("@baseline-ui/core").then((mod) => mod.Select),
  { ssr: false }
);
const ActionButton = dynamic(
  () => import("@baseline-ui/core").then((mod) => mod.ActionButton),
  { ssr: false }
);

const SidePanel = ({
  users,
  currUser,
  currSignee,
  userChange,
  PSPDFKit,
  isVisible,
  selectedSignee,
  signeeChanged,
  deleteUser,
  addSignee,
  onDragStart,
  onDragEnd,
  applyDSign,
  instance,
  containerRef,
  setIsLoading,
  setPdfUrl,
}:any) => {
  return (
    <div className="side-panel">
      <div className="section user-section">
        <h3 className="section-title">
          user
        </h3>
        <div  className="section-description">
          Choose &apos;Admin&apos; to edit and prepare the document for signing,
          or select a user to sign the document as that user.
        </div>
        <Select
          items={users.map((user:any) => {
            return {
              id: user.id.toString(),
              label:
                user?.name.length > 15
                  ? user?.name.slice(0, 15) + "..."
                  : user?.name,
              icon: () =>
                user.role == "Editor" ? null : (
                  <RedCircleIcon color={user.color.toString()} />
                ),
            } as any;
          })}
          className="input-custom-style"
          selectedKey={currUser.id.toString()}
          onSelectionChange={
            ((selected: any) => {
              userChange(
                users.find((user:any) => user.id == selected) as User,
                PSPDFKit
              );
            }) as any
          }
        />
      </div>
      {isVisible && (
        <>
          <div className="section signers-section">
            <h3 className="section-title">
              Signers
            </h3>
            <div className="section-description">
              Select the signer to assign fields to.
            </div>
            <div>
              <div>
                {users?.map((user) =>
                    user.role !== 'Editor' ? (
                        <SignerItem
                            key={user.id}
                            user={user}
                            isSelected={selectedSignee.id === user.id}
                            onSigneeChange={signeeChanged}
                            onDelete={deleteUser}
                        />
                    ) : null
                )}
              </div>
            </div>
            <ActionButton
              label={"+ Add New"}
              size="md"
              onPress={addSignee}
              className="custom-button"
              style={{ margin: "15px 0px 0px 0px" }}
            />
          </div>
          <div className="section fields-section">
            <h3 className="section-title">
              Add fields
            </h3>
            <div className="section-description">
              Drag & drop fields on the document
            </div>
            <DraggableAnnotation
              className="mt-5"
              type={AnnotationTypeEnum.SIGNATURE}
              label="Signature"
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              userColor={currSignee.color}
            />
            <DraggableAnnotation
              className="mt-5"
              type={AnnotationTypeEnum.INITIAL}
              label="Initial"
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              userColor={currSignee.color}
            />
            <DraggableAnnotation
              className="mt-5"
              type={AnnotationTypeEnum.RadioButton}
              label="Radio Button"
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              userColor={{ r: 255, g: 255, b: 255 }}
            />
            <DraggableAnnotation
              className="mt-5"
              type={AnnotationTypeEnum.CheckBox}
              label="Check Box"
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              userColor={{ r: 255, g: 255, b: 255 }}
            />
            <DraggableAnnotation
              className="mt-5"
              type={AnnotationTypeEnum.TextField}
              label="Text Field"
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              userColor={{ r: 255, g: 255, b: 255 }}
            />
            <DraggableAnnotation
              className="mt-5"
              type={AnnotationTypeEnum.DS}
              label="Digital Signature"
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              userColor={{ r: 255, g: 255, b: 255 }}
            />
            <ActionButton
              label={"Apply Digital Signature"}
              size="md"
              onPress={async function da() {
                await applyDSign(
                  instance,
                  containerRef,
                  setIsLoading,
                  setPdfUrl
                );
              }}
              className="custom-button"
              style={{ margin: "15px 0px 0px 0px" }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SidePanel;

const RedCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ color }) => {
  const jsonString = color
    ? color.substring(2).replace(/(\w+):/g, '"$1":')
    : "";
  try {
    // Parse the JSON string into an object
    const colorObject = JSON.parse(jsonString);
    //console.log("Color: ", colorObject);
    return (
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="10"
          cy="10"
          r="10"
          fill={`rgb(${colorObject.r},${colorObject.g},${colorObject.b})`}
        />
      </svg>
    );
  } catch (error) {}
};
