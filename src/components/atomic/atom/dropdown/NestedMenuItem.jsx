import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowRight from "@mui/icons-material/ArrowRight";
import { ForkLeft } from "@mui/icons-material";

const NestedMenuItem = React.forwardRef((props, ref) => {
  const {
    parentMenuOpen,
    label,
    rightIcon,
    leftIcon,
    keepOpen,
    children,
    customTheme,
    className,
    tabIndex: tabIndexProp,
    ContainerProps: ContainerPropsProp = {},
    rightAnchored,
    ...MenuItemProps
  } = props;

  const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

  const menuItemRef = React.useRef(null);
  React.useImperativeHandle(ref, () => menuItemRef.current);

  const containerRef = React.useRef(null);
  React.useImperativeHandle(containerRefProp, () => containerRef.current);

  const menuContainerRef = React.useRef(null);

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const handleMouseEnter = (event) => {
    setIsSubMenuOpen(true);

    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event);
    }
  };

  const handleMouseLeave = (event) => {
    setIsSubMenuOpen(false);

    if (ContainerProps?.onMouseLeave) {
      ContainerProps.onMouseLeave(event);
    }
  };

  const isSubmenuFocused = () => {
    const active = containerRef.current?.ownerDocument?.activeElement;

    for (const child of menuContainerRef.current?.children ?? []) {
      if (child === active) {
        return true;
      }
    }
    return false;
  };

  const handleFocus = (event) => {
    if (event.target === containerRef.current) {
      setIsSubMenuOpen(true);
    }

    if (ContainerProps?.onFocus) {
      ContainerProps.onFocus(event);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      return;
    }

    if (isSubmenuFocused()) {
      event.stopPropagation();
    }

    const active = containerRef.current?.ownerDocument?.activeElement;

    if (event.key === "ArrowLeft" && isSubmenuFocused()) {
      containerRef.current?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      event.target === containerRef.current &&
      event.target === active
    ) {
      const firstChild = menuContainerRef.current?.children[0];
      firstChild?.focus();
    }
  };

  const open = isSubMenuOpen && parentMenuOpen;

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return (
    <div
      {...ContainerProps}
      ref={containerRef}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <MenuItem
        {...MenuItemProps}
        data-open={!!open || undefined}
        className={className}
        ref={menuItemRef}
        keepOpen={keepOpen}
      >
        {leftIcon}
        {label}
        <div style={{ flexGrow: 1 }} />
        {rightIcon}
      </MenuItem>

      <Menu
        hideBackdrop
        style={{ pointerEvents: "none" }}
        anchorEl={menuItemRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: rightAnchored ? "left" : "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: rightAnchored ? "right" : "left",
        }}
        css={customTheme}
        open={!!open}
        autoFocus={false}
        disableAutoFocus
        disableEnforceFocus
        disablePortal
        onClose={() => {
          setIsSubMenuOpen(false);
        }}
      >
        <div ref={menuContainerRef} style={{ pointerEvents: "auto" }}>
          {children}
        </div>
      </Menu>
    </div>
  );
});

export default NestedMenuItem;
