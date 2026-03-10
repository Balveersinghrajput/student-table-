import { useState } from "react";

/**
 * Avatar component — shows uploaded profile photo if available,
 * otherwise falls back to initial letter circle.
 */
export default function Avatar({ profilePhoto, name, size = 34, style }) {
  const [imgError, setImgError] = useState(false);
  const initial = name?.charAt(0)?.toUpperCase() || "?";
  const url = profilePhoto ? `http://localhost:3000${profilePhoto}` : null;

  const base = {
    width: size,
    height: size,
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...style,
  };

  if (url && !imgError) {
    return (
      <div style={base}>
        <img
          src={url}
          alt={initial}
          width={size}
          height={size}
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div
      className="avatar-sm"
      style={{ ...base, fontSize: Math.round(size * 0.38) }}
    >
      {initial}
    </div>
  );
}
