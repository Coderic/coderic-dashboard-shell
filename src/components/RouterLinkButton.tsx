import { Button, type ButtonProps } from "@patternfly/react-core";
import { Link, type To } from "react-router-dom";

export function RouterLinkButton({ to, children, ...rest }: ButtonProps & { to: To }) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Button component="span" {...rest}>
        {children}
      </Button>
    </Link>
  );
}
