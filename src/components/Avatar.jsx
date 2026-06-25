export const Avatar = ({ name, size = 40 }) => {
  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hue =
    (name || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `hsl(${hue},50%,88%)`,
        border: `2px solid hsl(${hue},50%,74%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.33,
        fontWeight: 700,
        color: `hsl(${hue},40%,28%)`,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
};
