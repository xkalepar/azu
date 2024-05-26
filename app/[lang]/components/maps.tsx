type Props = {
  src?: string;
};
const AddressMap = ({
  src = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6726.266711892926!2d13.438495000000001!3d32.549286!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a8a5409540030d%3A0x9d4751b4074efd2f!2z2KzYp9mF2LnYqSDYp9mE2LLZitiq2YjZhtip!5e0!3m2!1sar!2sly!4v1716647883321!5m2!1sar!2sly",
}: Props) => {
  return (
    <div className="google-map-code">
      <iframe
        src={src}
        width="100%"
        height="300"
        allowFullScreen={true}
        aria-hidden="false"
        tabIndex={0}
        loading="lazy"
      />
    </div>
  );
};
export default AddressMap;
