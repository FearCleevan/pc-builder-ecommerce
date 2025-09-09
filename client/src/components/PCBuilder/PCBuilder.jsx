//client/src/components/PCBuilder/PCBuilder.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CreateNewBuild from './CreateNewBuild/CreateNewBuild';
import PCBuildHeader from './PCBuildHeader/PCBuildHeader';
import PCBuildBody from './PCBuildBody/PCBuildBody';
import PCBuildFooter from './PCBuildFooter/PCBuildFooter';
import styles from './PCBuilder.module.css';

const PCBuilder = () => {
  return (
    <div className={styles.pcBuilder}>
      <Header />
      <div className={styles.container}>
        <CreateNewBuild />
        <PCBuildHeader />
        <PCBuildBody />
        <PCBuildFooter />
      </div>
      <Footer />
    </div>
  );
};

export default PCBuilder;