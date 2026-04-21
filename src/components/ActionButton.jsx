function ActionButton({
  children,
  className = '',
  disabled = false,
  href,
  rel,
  target,
  type = 'button',
  ...rest
}) {
  const classes = `action-button ${className}`.trim();

  if (href && !disabled) {
    return (
      <a className={classes} href={href} rel={rel} target={target} {...rest}>
        {children}
      </a>
    );
  }

  if (href && disabled) {
    return (
      <span aria-disabled="true" className={`${classes} is-disabled`}>
        {children}
      </span>
    );
  }

  return (
    <button className={classes} disabled={disabled} type={type} {...rest}>
      {children}
    </button>
  );
}

export default ActionButton;
