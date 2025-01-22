import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author }
const StartupCard = ({ post }: { post: StartupTypeCard }) => {

  const {
    _createdAt,
    views,
    _id,
    author,
    description,
    title,
    image,
    category,
  } = post
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="Startup_card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>

        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>

          <Link href={`/startup/${_id}`}>
            <h2 className="text-26-semibold line-clamp-1">{title}</h2>
          </Link>

          {/* <p className="text-16-medium line-clamp-2">{description}</p> */}
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image className="rounded-full" src={author?.image || '/default-image.png'} alt="startup" width={48} height={48} />
        </Link>

      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <Image src={image || '/default-image.png'} width="500" height="100" className="startup-card_img" alt="" />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>

        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>
            <p>Details</p>
          </Link>
        </Button>

      </div>

    </li>
  )
}

export default StartupCard