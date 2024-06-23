import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link';

function IssuePage() {
  return (
    <div>
      <Link href={'/issues/new'}>
        <Button>New Issue</Button>
      </Link>
    </div>
  )
}

export default IssuePage;