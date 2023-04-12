const slug = (s: string): string => s.replace(/\s/g, '-').toLowerCase();

export default slug;
