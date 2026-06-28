import Graph from '@/components/dashboard/Graph'
import Layout from '@/components/layout/Layout'
import useAbility from '@/hooks/useAbility';
import Head from 'next/head';
import React from 'react'

const Dashboard = () => {
  const ability = useAbility();
  return (
    <Layout>
      <Head>
        <title>Dashboard - CRP Admin Panel</title>
      </Head>
    </Layout>
  )
}

export default Dashboard