import Image from 'next/image';
import React from 'react';

export default function Icon({ src }: { src: string }) {
	return <Image src={src} width={24} height={24} layout="fixed" />;
}
