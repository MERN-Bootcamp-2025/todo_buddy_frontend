// /* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, useMemo } from "react";
import { TbLoader } from "react-icons/tb";
import { solidButton } from "./ButtonStyles";
import {type ButtonProps } from "../../interfaces/ButtonInterface";

type Ref = HTMLButtonElement;


const Button = forwardRef<Ref, ButtonProps>((props, ref) => {

  const { type, children, buttonStyle, buttonVariant, disabled, isLoading, leftIcon, rightIcon,className, ...rest } = props;

  const { newIcon: icon, iconPlacement } = useMemo(() => {
    let newIcon = rightIcon || leftIcon;

    if (isLoading) {
      newIcon = <TbLoader className="animate-spin" size={25} />;
    
    }

    return {
      newIcon,
      iconPlacement: rightIcon ? ("right" as const) : ("left" as const),
    };
  }, [isLoading, leftIcon, rightIcon]);

  const renderButtonVariant=()=>{
    if(buttonVariant==="solid"){
      return solidButton({...buttonStyle,className})
    }
   }

  return (
    <button
      className={renderButtonVariant()}
      {...rest}
      type={type ? "submit" : "button"}
      ref={ref}
      disabled={disabled || isLoading}
    >
      {icon && iconPlacement === "left" ? (
        <span className={`inline-flex shrink-0 self-center ${children && !isLoading && "mr-2"}`}>{icon}</span>
      ) : null}
      {!isLoading && children}
      {icon && iconPlacement === "right" ? (
        <span className={`inline-flex shrink-0 self-center  ${children && !isLoading && "ml-2"}`}>{icon}</span>
      ) : null}
    </button>
  );
});

// set default props
// Button.defaultProps = {
//   buttonStyle: {},
//   buttonVariant: "solid",
//   isLoading: false,
//   disabled: false,
//   leftIcon: undefined,
//   rightIcon: undefined,
// };

export default Button;